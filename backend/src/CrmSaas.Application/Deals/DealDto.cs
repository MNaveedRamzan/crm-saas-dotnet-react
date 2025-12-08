using CrmSaas.Domain.Enums;

namespace CrmSaas.Application.Deals;

public class DealDto
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public decimal Amount { get; set; }
    public DealStatus Status { get; set; }
    public int CustomerId { get; set; }
    public string? CustomerName { get; set; }
}
