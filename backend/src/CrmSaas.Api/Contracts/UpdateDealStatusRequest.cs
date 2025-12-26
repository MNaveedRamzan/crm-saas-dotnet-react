using CrmSaas.Domain.Enums;

namespace CrmSaas.Api.Contracts;

public class UpdateDealStatusRequest
{
    public DealStatus Status { get; set; }
}
