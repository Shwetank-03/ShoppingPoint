using System.ComponentModel.DataAnnotations;

namespace Groceries.API.Models
{
    public class ProductCategory
    {
        [Key]
        public int Id { get; set; }
        public string Category { get; set; } = " ";
        public string SubCategory { get; set; } = " ";
    }
}
