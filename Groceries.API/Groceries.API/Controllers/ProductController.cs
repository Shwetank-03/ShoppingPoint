using Microsoft.AspNetCore.Mvc;
using Groceries.API.DataAccess;
using Groceries.API.Models;

namespace Groceries.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        public ProductController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            
            bool success = _dataAccess.InsertProduct(product);

            if (success)
            {
                
                var imageBytes = Convert.FromBase64String(product.Image);
                string imagePath = Path.Combine("wwwroot", "images", $"{product.Id}.jpg");
                System.IO.File.WriteAllBytes(imagePath, imageBytes);

                return Ok("Product created successfully");
            }
            else
            {
                return BadRequest("Failed to create product");
            }
        }
    }
}
