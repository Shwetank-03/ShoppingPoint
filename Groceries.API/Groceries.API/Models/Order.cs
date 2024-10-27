using Groceries.API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Order
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; } // Foreign key for User

    [ForeignKey("UserId")]
    public User User { get; set; } // Navigation property

    public int CartId { get; set; } // Foreign key for Cart

    [ForeignKey("CartId")]
    public Cart Cart { get; set; } // Navigation property

    public int PaymentId { get; set; } // Foreign key for Payment

    [ForeignKey("PaymentId")]
    public Payment Payment { get; set; } // Navigation property
    public object CreatedAt { get; internal set; }
}
