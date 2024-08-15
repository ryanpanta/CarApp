﻿namespace WebApi8_CarsApp.Models
{
    public class ResponseModel<T>
    {
        public T? Dados {  get; set; }
        public string Mensagem { get; set; } = string.Empty;
        public bool Status { get; set; } = true;
        public int TotalItems { get; set; }
    }
}
