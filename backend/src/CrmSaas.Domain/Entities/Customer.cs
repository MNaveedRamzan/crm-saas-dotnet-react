namespace CrmSaas.Domain.Entities;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string? Phone { get; set; }
    public string? Company { get; set; }

    public ICollection<Deal> Deals { get; set; } = new List<Deal>();
}
