namespace CrmSaas.Domain.Entities;

public class User
{
    public int Id { get; set; }

    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public string FullName { get; set; } = default!;

    public string Role { get; set; } = "User"; // "Admin" / "User" etc.

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
