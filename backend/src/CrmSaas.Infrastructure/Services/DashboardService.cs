using CrmSaas.Application.Common;
using CrmSaas.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CrmSaas.Infrastructure.Services;

public sealed class DashboardService : IDashboardService
{
    private readonly AppDbContext _db;

    public DashboardService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync()
    {
        // ✅ Run sequentially to avoid DbContext concurrency issue

        var totalDeals = await _db.Deals.AsNoTracking().CountAsync();
        var totalRevenue = await _db.Deals.AsNoTracking().SumAsync(d => (decimal?)d.Amount) ?? 0m;

        var dealsByStatus = await _db.Deals
            .AsNoTracking()
            .GroupBy(d => d.Status)
            .Select(g => new DealsByStatusDto
            {
                Status = g.Key.ToString(), // New, InProgress, Won, Lost
                Count = g.Count()
            })
            .ToListAsync();

        var topCustomers = await _db.Deals
            .AsNoTracking()
            .Include(d => d.Customer)
            .GroupBy(d => new { d.CustomerId, CustomerName = d.Customer!.Name })
            .Select(g => new TopCustomerDto
            {
                CustomerName = g.Key.CustomerName,
                TotalAmount = g.Sum(x => x.Amount)
            })
            .OrderByDescending(x => x.TotalAmount)
            .Take(5)
            .ToListAsync();

        return new DashboardSummaryDto
        {
            TotalDeals = totalDeals,
            TotalRevenue = totalRevenue,
            DealsByStatus = dealsByStatus,
            TopCustomers = topCustomers
        };
    }
}
