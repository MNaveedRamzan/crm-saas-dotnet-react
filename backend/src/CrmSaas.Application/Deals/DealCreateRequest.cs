using CrmSaas.Domain.Enums;

namespace CrmSaas.Application.Deals;

public class DealCreateRequest
{
    public string Title { get; set; } = default!;
    public decimal Amount { get; set; }
    public DealStatus Status { get; set; } = DealStatus.New;
    public int CustomerId { get; set; }
}
