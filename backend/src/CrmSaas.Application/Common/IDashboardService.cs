namespace CrmSaas.Application.Common;

public interface IDashboardService
{
    Task<DashboardSummaryDto> GetSummaryAsync();
}
