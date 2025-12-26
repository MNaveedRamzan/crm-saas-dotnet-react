using CrmSaas.Domain.Enums;

namespace CrmSaas.Application.Deals;

public class UpdateDealStatusRequest
{
    public DealStatus Status { get; set; }
}
