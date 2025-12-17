using CrmSaas.Application.Common;
using CrmSaas.Application.Deals;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrmSaas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DealsController : ControllerBase
{
    private readonly IDealService _service;

    public DealsController(IDealService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<DealDto>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] int? customerId = null,
        [FromQuery] int? status = null,
        [FromQuery] string? q = null
    )
    {
        var result = await _service.GetPagedAsync(page, pageSize, customerId, status, q);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<DealDto>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    // ✅ Return created DealDto for optimistic UI
    [HttpPost]
    public async Task<ActionResult<DealDto>> Create([FromBody] DealCreateRequest request)
    {
        var deal = await _service.CreateAndReturnAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = deal.Id }, deal);
    }

    [HttpPatch("{id:int}/status")]
    public async Task<ActionResult> UpdateStatus(int id, [FromBody] DealStatusUpdateRequest request)
    {
        await _service.UpdateStatusAsync(id, request);
        return NoContent();
    }
}
