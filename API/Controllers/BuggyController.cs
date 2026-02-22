#pragma warning disable format
using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController :BaseApiController
{
    [HttpGet("auth")]
    public IActionResult GetAuth()
    {
        return Unauthorized();
    }

        [HttpGet("not-found")]
    public IActionResult GetFound()
    {
        return NotFound();
    }

     [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new Exception("This is an error server");          
        
    }
    
     [HttpGet("bad-request")]
    public IActionResult GetBadResquest()
    {
       return BadRequest("This was not a good request ");           
        
    }
}

