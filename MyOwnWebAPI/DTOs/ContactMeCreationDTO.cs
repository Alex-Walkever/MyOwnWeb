﻿namespace MyOwnWeb.DTOs
{
    public class ContactMeCreationDTO
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required string Message { get; set; }
    }
}
