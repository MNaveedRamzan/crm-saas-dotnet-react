using CrmSaas.Domain.Enums;

namespace CrmSaas.Domain.Entities;

public class Deal
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public decimal Amount { get; set; }
    public DealStatus Status { get; set; } = DealStatus.New;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int CustomerId { get; set; }
    public Customer? Customer { get; set; }
}
