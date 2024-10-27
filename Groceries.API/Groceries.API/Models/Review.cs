using Groceries.API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Review
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; } // Foreign key for User

    [ForeignKey("UserId")]
    public User User { get; set; } // Navigation property

    public int ProductId { get; set; } // Foreign key for Product

    [ForeignKey("ProductId")]
    public Product Product { get; set; } // Navigation property
    public string CreatedAt { get; internal set; }
    public string Value { get; internal set; }
}
