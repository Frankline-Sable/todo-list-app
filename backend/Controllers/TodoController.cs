using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController : ControllerBase
{
    private readonly TodoDbContext _todoDbContext;

    public TodoController(TodoDbContext todoDbContext)
    {
        _todoDbContext = todoDbContext;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateRequest request,
        [FromHeader(Name = "from")] string from)
    {
        if (string.IsNullOrEmpty(from))
        {
            return BadRequest("Invalid request, header is not conforming");
        }

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest("Invalid request, title is required");
        }

        var todoRecord = new TodoDbModel
        {
            Title = request.Title,
            Description = request.Description,
        };

        _todoDbContext.TodoDbModel.Add(todoRecord);
        await _todoDbContext.SaveChangesAsync();
        return Ok(todoRecord);
    }


}