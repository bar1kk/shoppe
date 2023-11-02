package dev.danilbel.backend.security;

import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.mapper.JwtUserMapper;
import dev.danilbel.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {

    UserService userService;

    JwtUserMapper jwtUserMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {
            UserEntity user = userService.getUserEntityByEmail(username);
            JwtUser jwtUser = jwtUserMapper.toJwtUser(user);
            log.info("IN JwtUserDetailsService.loadUserByUsername - user with username: {} successfully loaded", username);
            return jwtUser;
        } catch (NotFoundException e) {
            throw new UsernameNotFoundException(e.getMessage());
        }
    }
}
