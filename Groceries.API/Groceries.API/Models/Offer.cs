using System.ComponentModel.DataAnnotations;

namespace Groceries.API.Models
{
    public class Offer
    {
        [Key]
        internal int Discount;

        public int Id { get; set; }
        public string Title { get; set; } = " ";


    }
}
