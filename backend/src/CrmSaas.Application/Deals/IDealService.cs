using CrmSaas.Application.Common;

namespace CrmSaas.Application.Deals;

public interface IDealService
{
    Task<List<DealDto>> GetAllAsync();
    Task<PagedResult<DealDto>> GetPagedAsync(
        int page,
        int pageSize,
        int? customerId = null,
        int? status = null,
        string? q = null
    );

    Task<DealDto?> GetByIdAsync(int id);

    Task<int> CreateAsync(DealCreateRequest request);

    // ✅ NEW: returns created DealDto (for optimistic UI)
    Task<DealDto> CreateAndReturnAsync(DealCreateRequest request);

    Task UpdateStatusAsync(int id, DealStatusUpdateRequest request);
}
