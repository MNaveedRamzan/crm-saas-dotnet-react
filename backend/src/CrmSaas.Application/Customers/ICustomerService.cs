namespace CrmSaas.Application.Customers;

public interface ICustomerService
{
    Task<List<CustomerDto>> GetAllAsync();
    Task<CustomerDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(CustomerCreateRequest request);
    Task UpdateAsync(int id, CustomerUpdateRequest request);
    Task DeleteAsync(int id);
}
