namespace CrmSaas.Application.Deals;

public interface IDealService
{
    Task<List<DealDto>> GetAllAsync();
    Task<DealDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(DealCreateRequest request);
    Task UpdateStatusAsync(int id, DealStatusUpdateRequest request);
}
