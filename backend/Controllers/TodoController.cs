using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            CreatedAt =DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        _todoDbContext.Todos.Add(todoRecord);
        await _todoDbContext.SaveChangesAsync();
        return Ok(todoRecord);
    }

    [HttpGet("")]
    public async Task<IActionResult> GetTodos()
    {
        var todos = await _todoDbContext.Todos.OrderByDescending(t => t.UpdatedAt).ToListAsync();
        return Ok(todos);
    }
}