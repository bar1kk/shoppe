package dev.danilbel.backend.security;

import dev.danilbel.backend.entity.RoleEntity;
import dev.danilbel.backend.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.lifetime}")
    private Duration lifetime;

    public final UserDetailsService userDetailsService;

    @PostConstruct
    protected void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String generateToken(UserEntity userEntity) {

        Date now = new Date();
        Date validity = new Date(now.getTime() + lifetime.toMillis());

        String token = Jwts.builder()
                .setSubject(userEntity.getEmail())
                .claim("roles", getRoleNames(userEntity.getRoles()))
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.ES256, secret)
                .compact();

        log.info("IN JwtTokenProvider.generateToken - token: {} generated for user with email '{}'", token, userEntity.getEmail());
        return token;
    }

    private List<String> getRoleNames(Set<RoleEntity> userRoles) {
        return userRoles.stream()
                .map(RoleEntity::getName)
                .collect(Collectors.toList());
    }

    public String getEmail(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token).getBody().getSubject();
    }

    public Authentication getAuthentication(String token) {

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(getEmail(token));

            log.info("IN JwtTokenProvider.getAuthentication - user with email '{}' successfully authenticated", userDetails.getUsername());
            return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        } catch (UsernameNotFoundException e) {

            log.info("IN JwtTokenProvider.getAuthentication - can't authenticate user with email '{}'", getEmail(token));
            return null;
        }
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            log.info("IN JwtTokenProvider.resolveToken - token: {} successfully resolved", bearerToken);
            return bearerToken.substring(7);
        }

        log.info("IN JwtTokenProvider.resolveToken - token is null or doesn't start with 'Bearer '");
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token);

            if (claimsJws.getBody().getExpiration().before(new Date())) {

                log.info("IN JwtTokenProvider.validateToken - token: {} is expired", token);
                return false;
            }

            log.info("IN JwtTokenProvider.validateToken - token: {} is valid", token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {

            log.info("IN JwtTokenProvider.validateToken - token: {} is invalid", token);
            return false;
        }
    }
}
