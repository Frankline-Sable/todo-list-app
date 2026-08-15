using System.ComponentModel.DataAnnotations;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    public DbSet<TodoDbModel> TodoDbModel { get; set; }
}
