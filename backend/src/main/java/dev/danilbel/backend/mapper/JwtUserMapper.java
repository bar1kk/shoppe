package dev.danilbel.backend.mapper;

import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.security.JwtUser;
import org.mapstruct.Mapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface JwtUserMapper {

    default JwtUser toJwtUser(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }

        String id = userEntity.getId();
        String email = userEntity.getEmail();
        String password = userEntity.getPassword();
        List<GrantedAuthority> authorities = userEntity.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new JwtUser(id, email, password, authorities);
    }
}
