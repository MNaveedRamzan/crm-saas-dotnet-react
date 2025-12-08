using CrmSaas.Domain.Entities;
using CrmSaas.Domain.Enums;
using Microsoft.EntityFrameworkCore;
namespace CrmSaas.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Deal> Deals => Set<Deal>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(c => c.Name).IsRequired().HasMaxLength(200);
            entity.Property(c => c.Email).IsRequired().HasMaxLength(200);
        });

        modelBuilder.Entity<Deal>(entity =>
        {
            entity.Property(d => d.Title).IsRequired().HasMaxLength(200);
            entity.Property(d => d.Amount).HasConversion<decimal>();
            entity.Property(d => d.Status).HasConversion<int>();
        });

        // Seed data
        modelBuilder.Entity<Customer>().HasData(
            new Customer { Id = 1, Name = "Acme Corp", Email = "info@acme.com", Phone = "111-111-1111", Company = "Acme" },
            new Customer { Id = 2, Name = "Global Tech", Email = "contact@globaltech.com", Phone = "222-222-2222", Company = "Global Tech" }
        );

        modelBuilder.Entity<Deal>().HasData(
            new Deal { Id = 1, Title = "Website Redesign", Amount = 5000, Status = DealStatus.New, CustomerId = 1 },
            new Deal { Id = 2, Title = "SaaS Subscription", Amount = 12000, Status = DealStatus.InProgress, CustomerId = 2 }
        );
    }
}
