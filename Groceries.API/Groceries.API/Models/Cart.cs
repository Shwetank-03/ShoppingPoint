using Groceries.API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Cart
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; } // Foreign key for User

    [ForeignKey("UserId")]
    public User User { get; set; } // Navigation property

    public List<CartItem> CartItems { get; set; } = new List<CartItem>();

    public bool Ordered { get; set; }

    public string OrderedOn { get; set; } = string.Empty;
}
