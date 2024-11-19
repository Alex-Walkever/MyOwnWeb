﻿using MyOwnWeb.Interfaces;

namespace MyOwnWeb.DTOs
{
    public class ContactMeDTO: IId
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required string Message { get; set; }
        public bool Readed { get; set; }
        public DateTime Obtained { get; set; }
    }
}
