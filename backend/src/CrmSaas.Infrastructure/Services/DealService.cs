using CrmSaas.Application.Deals;
using CrmSaas.Domain.Entities;
using CrmSaas.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CrmSaas.Infrastructure.Services;

public class DealService : IDealService
{
    private readonly AppDbContext _db;

    public DealService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<DealDto>> GetAllAsync()
    {
        return await _db.Deals
            .Include(d => d.Customer)
            .Select(d => new DealDto
            {
                Id = d.Id,
                Title = d.Title,
                Amount = d.Amount,
                Status = d.Status,
                CustomerId = d.CustomerId,
                CustomerName = d.Customer!.Name
            })
            .ToListAsync();
    }

    public async Task<DealDto?> GetByIdAsync(int id)
    {
        var d = await _db.Deals
            .Include(d => d.Customer)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (d == null) return null;

        return new DealDto
        {
            Id = d.Id,
            Title = d.Title,
            Amount = d.Amount,
            Status = d.Status,
            CustomerId = d.CustomerId,
            CustomerName = d.Customer?.Name
        };
    }

    public async Task<int> CreateAsync(DealCreateRequest request)
    {
        var entity = new Deal
        {
            Title = request.Title,
            Amount = request.Amount,
            Status = request.Status,
            CustomerId = request.CustomerId
        };

        _db.Deals.Add(entity);
        await _db.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateStatusAsync(int id, DealStatusUpdateRequest request)
    {
        var entity = await _db.Deals.FindAsync(id);
        if (entity == null) throw new KeyNotFoundException("Deal not found");

        entity.Status = request.Status;
        await _db.SaveChangesAsync();
    }
}
