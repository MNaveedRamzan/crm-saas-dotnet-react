using CrmSaas.Api.Contracts;
using CrmSaas.Infrastructure.Persistence;
using CrmSaas.Infrastructure.Persistence.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmSaas.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/customers/{customerId:int}/notes")]
public class CustomerNotesController : ControllerBase
{
    private readonly AppDbContext _db;

    public CustomerNotesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get(int customerId)
    {
        // customer exists check (optional but good)
        var exists = await _db.Customers.AnyAsync(c => c.Id == customerId);
        if (!exists) return NotFound("Customer not found");

        var notes = await _db.CustomerNotes
            .Where(n => n.CustomerId == customerId)
            .OrderByDescending(n => n.CreatedAtUtc)
            .ToListAsync();

        return Ok(notes);
    }

    [HttpPost]
    public async Task<IActionResult> Create(int customerId, [FromBody] CreateCustomerNoteRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Note))
            return BadRequest("Note is required");

        var exists = await _db.Customers.AnyAsync(c => c.Id == customerId);
        if (!exists) return NotFound("Customer not found");

        var entity = new CustomerNote
        {
            CustomerId = customerId,
            Note = req.Note.Trim()
        };

        _db.CustomerNotes.Add(entity);
        await _db.SaveChangesAsync();

        return Ok(entity);
    }

    [HttpDelete("{noteId:int}")]
    public async Task<IActionResult> Delete(int customerId, int noteId)
    {
        var note = await _db.CustomerNotes
            .FirstOrDefaultAsync(n => n.Id == noteId && n.CustomerId == customerId);

        if (note == null) return NotFound();

        _db.CustomerNotes.Remove(note);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
