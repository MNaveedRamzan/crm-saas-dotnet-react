namespace CrmSaas.Application.Customers;

public class CustomerUpdateRequest
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string? Phone { get; set; }
    public string? Company { get; set; }
}
