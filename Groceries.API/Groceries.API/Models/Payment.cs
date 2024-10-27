using Groceries.API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Payment
{
    [Key]
    public int Id { get; set; }

    public int PaymentMethodId { get; set; } // Foreign key for PaymentMethod

    [ForeignKey("PaymentMethodId")]
    public PaymentMethod PaymentMethod { get; set; } // Navigation property

    public int UserId { get; set; } // Foreign key for User

    [ForeignKey("UserId")]
    public User User { get; set; } // Navigation property
    public object TotalAmount { get; internal set; }
    public object ShippingCharges { get; internal set; }
    public object AmountReduced { get; internal set; }
    public object AmountPaid { get; internal set; }
    public object CreatedAt { get; internal set; }
}
