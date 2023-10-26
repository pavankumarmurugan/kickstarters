package com.profile.service.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.profile.service.config.JwtService;
import com.profile.service.entity.EmailConfirmationEntity;
import com.profile.service.entity.Role;
import com.profile.service.entity.UserEntity;
import com.profile.service.repository.EmailConfirmationRepository;
import com.profile.service.repository.UserRepository;
import com.profile.service.request.UserRegisterRequest;
import com.profile.service.request.UserSignInRequest;
import com.profile.service.response.UserRegisterResponse;
import com.profile.service.response.UserSignInResponse;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private EmailConfirmationRepository emailConfirmationRepository;
	
	@Autowired
	private EmailService emailService;

	@Override
	public UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest) {

		if (Boolean.TRUE.equals(userRepository.existsByUserEmail(userRegisterRequest.getUserEmail()))) {
		    throw new IllegalArgumentException("Error: Email is already in use!");
		}
        
		UserEntity user = new UserEntity();
		
        user.setUserFirstName(userRegisterRequest.getUserFirstName());
        user.setUserLastName(userRegisterRequest.getUserLastName());
        user.setUserEmail(userRegisterRequest.getUserEmail());
        user.setUserPassword(passwordEncoder.encode(userRegisterRequest.getUserPassword()));
        
        if(userRegisterRequest.getUserRole().equals("JOBSEEKER")) {
        	user.setUserRole(Role.JOBSEEKER);
        } else if(userRegisterRequest.getUserRole().equals("EMPLOYER")) {
        	user.setUserRole(Role.EMPLOYER);
        }
        
        userRepository.save(user);
        
        String token = UUID.randomUUID().toString();

        EmailConfirmationEntity confirmationToken = new EmailConfirmationEntity();
        
        confirmationToken.setEmailConfirmationCreatedAt(LocalDateTime.now());
        confirmationToken.setEmailConfirmationExpiresAt(LocalDateTime.now().plusMinutes(15));
        confirmationToken.setUserId(user);
        confirmationToken.setEmailConfirmationToken(token);
        
        emailConfirmationRepository.save(confirmationToken);
        
        String link = "http://localhost:8080/api/v1/auth/confirm?token=" + token;
        emailService.send(
        		user.getUserEmail(),
                buildEmail(user.getUserFirstName(), link));
        
        return mapToUserRegisterResponse(user);
		
	}

	private UserRegisterResponse mapToUserRegisterResponse(UserEntity user){
		UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
		userRegisterResponse.setUserFirstName(user.getUserFirstName());
		userRegisterResponse.setUserLastName(user.getUserLastName());
		userRegisterResponse.setUserEmail(user.getUserEmail());
		userRegisterResponse.setUserRole(user.getUserRole().name());
		userRegisterResponse.setMessage("User registered successfully!");
        return userRegisterResponse;
    }

	@Override
	public UserSignInResponse userSignIn(UserSignInRequest userSignInRequest) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInRequest.getUserEmail(), userSignInRequest.getUserPassword()));
		var user = userRepository.findByUserEmail(userSignInRequest.getUserEmail()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		UserSignInResponse userSignInResponse = new UserSignInResponse();
		userSignInResponse.setToken(jwtToken);
		userSignInResponse.setMessage("Login Successfull!!");
		return userSignInResponse;
	}
	
	private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
	
	@Override
	@Transactional
    public String confirmToken(String token) {
		EmailConfirmationEntity emailConfirmationEntity = emailConfirmationRepository.findByEmailConfirmationToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("Token not found"));

        if (emailConfirmationEntity.getEmailConfirmationConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        LocalDateTime expiredAt = emailConfirmationEntity.getEmailConfirmationExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        emailConfirmationRepository.updateEmailConfirmationConfirmedAt(token, LocalDateTime.now());
        
        userRepository.enableUserEntity(emailConfirmationEntity.getUserId().getUserEmail());
        return "Confirmed";
    }
	
}