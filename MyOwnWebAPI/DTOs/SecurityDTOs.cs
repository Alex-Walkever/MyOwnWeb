using System.ComponentModel.DataAnnotations;

namespace MyOwnWeb.DTOs
{
    public class UserDTO
    {
        public required string Email { get; set; }
        public required string Username { get; set; }
        public required ClaimDTO Claims { get; set; }
    }

    public class AuthenticationResponseDTO
    {
        public required string Token { get; set; }
        public DateTime Expiration { get; set; }
    }

    public class UserCredentialsDTO
    {
        [EmailAddress]
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }
    }

    public class UserCredentialsEmailDTO
    {
        [EmailAddress]
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
    }

    public class UserCredentialsUsernameDTO
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }
    }

    public class ClaimDTO
    {
        public required string[] ClaimType { get; set; }
        public required string Username { get; set; }
    }
}
