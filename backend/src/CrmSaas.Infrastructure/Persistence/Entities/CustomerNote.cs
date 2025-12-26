namespace CrmSaas.Infrastructure.Persistence.Entities;

public class CustomerNote
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string Note { get; set; } = "";
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
