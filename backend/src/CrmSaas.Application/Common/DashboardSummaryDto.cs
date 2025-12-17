namespace CrmSaas.Application.Common;

public sealed class DashboardSummaryDto
{
    public int TotalDeals { get; init; }
    public decimal TotalRevenue { get; init; }
    public IReadOnlyList<DealsByStatusDto> DealsByStatus { get; init; } = Array.Empty<DealsByStatusDto>();
    public IReadOnlyList<TopCustomerDto> TopCustomers { get; init; } = Array.Empty<TopCustomerDto>();
}

public sealed class DealsByStatusDto
{
    public string Status { get; init; } = default!;
    public int Count { get; init; }
}

public sealed class TopCustomerDto
{
    public string CustomerName { get; init; } = default!;
    public decimal TotalAmount { get; init; }
}
