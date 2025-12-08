using CrmSaas.Domain.Enums;

namespace CrmSaas.Application.Deals;

public class DealStatusUpdateRequest
{
    public DealStatus Status { get; set; }
}