using CrmSaas.Application.Customers;
using CrmSaas.Domain.Entities;
using CrmSaas.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CrmSaas.Infrastructure.Services;

public class CustomerService : ICustomerService
{
    private readonly AppDbContext _db;

    public CustomerService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<CustomerDto>> GetAllAsync()
    {
        return await _db.Customers
            .Include(c => c.Deals)
            .Select(c => new CustomerDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone,
                Company = c.Company,
                DealsCount = c.Deals.Count
            })
            .ToListAsync();
    }

    public async Task<CustomerDto?> GetByIdAsync(int id)
    {
        var c = await _db.Customers
            .Include(c => c.Deals)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (c == null) return null;

        return new CustomerDto
        {
            Id = c.Id,
            Name = c.Name,
            Email = c.Email,
            Phone = c.Phone,
            Company = c.Company,
            DealsCount = c.Deals.Count
        };
    }

    public async Task<int> CreateAsync(CustomerCreateRequest request)
    {
        var entity = new Customer
        {
            Name = request.Name,
            Email = request.Email,
            Phone = request.Phone,
            Company = request.Company
        };

        _db.Customers.Add(entity);
        await _db.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(int id, CustomerUpdateRequest request)
    {
        var entity = await _db.Customers.FindAsync(id);
        if (entity == null) throw new KeyNotFoundException("Customer not found");

        entity.Name = request.Name;
        entity.Email = request.Email;
        entity.Phone = request.Phone;
        entity.Company = request.Company;

        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _db.Customers.FindAsync(id);
        if (entity == null) return;

        _db.Customers.Remove(entity);
        await _db.SaveChangesAsync();
    }
}
