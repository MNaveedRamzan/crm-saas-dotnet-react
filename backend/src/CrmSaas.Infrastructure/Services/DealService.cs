using CrmSaas.Application.Common;
using CrmSaas.Application.Deals;
using CrmSaas.Domain.Entities;
using CrmSaas.Domain.Enums;
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
            .AsNoTracking()
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

    public async Task<PagedResult<DealDto>> GetPagedAsync(
        int page,
        int pageSize,
        int? customerId = null,
        int? status = null,
        string? q = null)
    {
        if (page < 1) page = 1;
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _db.Deals
            .AsNoTracking()
            .Include(d => d.Customer)
            .AsQueryable();

        if (customerId.HasValue)
            query = query.Where(d => d.CustomerId == customerId.Value);

        if (status.HasValue)
            query = query.Where(d => (int)d.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(d =>
                d.Title.Contains(term) ||
                (d.Customer != null && d.Customer.Name.Contains(term))
            );
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(d => d.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(d => new DealDto
            {
                Id = d.Id,
                Title = d.Title,
                Amount = d.Amount,
                Status = d.Status,
                CustomerId = d.CustomerId,
                CustomerName = d.Customer != null ? d.Customer.Name : null
            })
            .ToListAsync();

        return new PagedResult<DealDto>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<DealDto?> GetByIdAsync(int id)
    {
        var d = await _db.Deals
            .AsNoTracking()
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == id);

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

    // ✅ NEW: create + return DealDto
    public async Task<DealDto> CreateAndReturnAsync(DealCreateRequest request)
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

        var created = await _db.Deals
            .AsNoTracking()
            .Include(d => d.Customer)
            .FirstAsync(d => d.Id == entity.Id);

        return new DealDto
        {
            Id = created.Id,
            Title = created.Title,
            Amount = created.Amount,
            Status = created.Status,
            CustomerId = created.CustomerId,
            CustomerName = created.Customer?.Name
        };
    }

    public async Task<DealDto?> UpdateStatusAsync(int id, DealStatus status)
    {
        var entity = await _db.Deals
            .Include(d => d.Customer)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (entity == null) return null;

        entity.Status = status;
        await _db.SaveChangesAsync();

        return ToDto(entity);
    }

    private static DealDto ToDto(Deal d)
    {
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

}
