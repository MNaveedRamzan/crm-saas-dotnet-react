using CrmSaas.Domain.Entities;
using CrmSaas.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CrmSaas.Infrastructure.Persistence;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        // ✅ Admin seed (simple example)
        var adminEmail = "admin@crm.com";
        var admin = await db.Users.FirstOrDefaultAsync(x => x.Email == adminEmail);

        if (admin == null)
        {
            // NOTE: yahan tumhara User entity fields match karo
            db.Users.Add(new User
            {
                Email = adminEmail,
                FullName = "CRM Admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Role = "Admin"
            });

            await db.SaveChangesAsync();
        }
    }
}
