using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Groceries.API.DataAccess;
using Groceries.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Groceries.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IDataAccess dataAccess;
        private readonly string dateFormat;
        private readonly IConfiguration configuration;

        public ShoppingController(IDataAccess dataAccess, IConfiguration configuration)
        {
            this.dataAccess = dataAccess;
            this.configuration = configuration;
            dateFormat = configuration["Constants:DateFormat"];
        }

        [HttpGet("GetCategoryList")]
        [AllowAnonymous]
        public IActionResult GetCategoryList()
        {
            var result = dataAccess.GetProductCategories();
            return Ok(result);
        }

        [HttpGet("GetProducts")]
        [AllowAnonymous]
        public IActionResult GetProducts(string category, string subcategory, int count)
        {
            try
            {
                var result = dataAccess.GetProducts(category, subcategory, count);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("GetProduct/{id}")]
        [AllowAnonymous]
        public IActionResult GetProduct(int id)
        {
            var result = dataAccess.GetProduct(id);
            return Ok(result);
        }

        [HttpPost("RegisterUser")]
        [AllowAnonymous]
        public IActionResult RegisterUser([FromBody] User user)
        {
            user.CreatedAt = DateTime.Now.ToString(dateFormat);
            user.ModifiedAt = DateTime.Now.ToString(dateFormat);
            var result = dataAccess.InsertUser(user);
            string message = result ? "inserted" : "email not available";
            return Ok(message);
        }

        [HttpPost("LoginUser")]
        [AllowAnonymous]
        public IActionResult LoginUser([FromBody] User user)
        {
            var token = dataAccess.IsUserPresent(user.Email, user.Password);
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            return Ok(new { token });
        }

        [HttpPost("InsertReview")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult InsertReview([FromBody] Review review)
        {
            review.CreatedAt = DateTime.Now.ToString("yyyy-MM-dd");
            dataAccess.InsertReview(review);
            return Ok("inserted");
        }

        [HttpGet("GetProductReviews/{productId}")]
        [AllowAnonymous]
        public IActionResult GetProductReviews(int productId)
        {
            try
            {
                var result = dataAccess.GetProductReviews(productId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("InsertCartItem/{userid}/{productid}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult InsertCartItem(int userid, int productid)
        {
            var result = dataAccess.InsertCartItem(userid, productid);
            return Ok(result ? "inserted" : "not inserted");
        }

        [HttpGet("GetActiveCartOfUser/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetActiveCartOfUser(int id)
        {
            var result = dataAccess.GetActiveCartOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetAllPreviousCartsOfUser/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetAllPreviousCartsOfUser(int id)
        {
            var result = dataAccess.GetAllPreviousCartsOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetPaymentMethods")]
        [AllowAnonymous]
        public IActionResult GetPaymentMethods()
        {
            var result = dataAccess.GetPaymentMethods();
            return Ok(result);
        }

        [HttpPost("InsertPayment")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult InsertPayment(Payment payment)
        {
            payment.CreatedAt = DateTime.Now.ToString();
            var id = dataAccess.InsertPayment(payment);
            return Ok(id.ToString());
        }

        [HttpPost("InsertOrder")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult InsertOrder(Order order)
        {
            order.CreatedAt = DateTime.Now.ToString();
            var id = dataAccess.InsertOrder(order);
            return Ok(id.ToString());
        }

        [HttpPost("CreateProduct")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Invalid product data");
            }

            var result = dataAccess.CreateProduct(product);
            if ((bool)result)
            {
                return Ok("Product created successfully");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating product");
            }
        }

        [HttpDelete("RemoveFromCart/{cartItemId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult RemoveFromCart(int cartItemId)
        {
            try
            {
                var result = dataAccess.RemoveCartItem(cartItemId);
                if ((bool)result)
                {
                    return Ok("Item removed from cart successfully");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error removing item from cart");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
