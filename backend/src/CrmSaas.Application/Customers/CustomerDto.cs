namespace CrmSaas.Application.Customers;

public class CustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public int DealsCount { get; set; }
}
