---
id: spring-boot
title: Spring Boot
---

## Introduction



## OAuth2 Security


Gradle setup to include the security setup:

```gradle

dependencies {
    implementation 'org.springframework.security:spring-security-oauth2-client'
    implementation 'org.springframework.security:spring-security-oauth2-jose'
//    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'com.microsoft.azure:azure-active-directory-spring-boot-starter'
    ...
}
```

The controller setup with `PreAuthorize` to check for role assignmen:

```java

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
public class ExampleController {
    @Autowired

    @PreAuthorize("hasRole('Group1')")
    @GetMapping(value="/example")
    public String greeting() {
        return "Example"
    }
}
```

A Config can then be setup to ensure that the roles are set for a given user:

```java
import net.minidev.json.JSONArray;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().authenticated().and().oauth2Login().userInfoEndpoint()
                .oidcUserService(this.oidcUserService());
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        final OidcUserService delegate = new OidcUserService();

        return (userRequest) -> {
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();
            // Delegate to the default implementation for loading a user
            OidcUser oidcUser = delegate.loadUser(userRequest);
            oidcUser.getAuthorities().forEach(authority -> {
                if (OidcUserAuthority.class.isInstance(authority)) {
                    OidcUserAuthority oidcUserAuthority = (OidcUserAuthority) authority;
                    Map<String, Object> userInfo = oidcUserAuthority.getAttributes();
                    JSONArray roles = null;
                    if (userInfo.containsKey("roles")) {
                        try {
                            roles = (JSONArray) userInfo.get("roles");
                            roles.forEach(s -> {
                                mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + (String) s));
                            });
                        } catch (Exception e) {
                            // Replace this with logger during implementation
                            e.printStackTrace();
                        }
                    }
                }
            });

            if(mappedAuthorities.isEmpty()) {
                mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            }

            return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
        };
    }

}
```
