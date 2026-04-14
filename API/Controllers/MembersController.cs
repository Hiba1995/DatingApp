using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    // [Route("api/[controller]")] // localhost:5000/api/members
    // [ApiController]
    
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController // return data from the database
    {
      
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers() // async is used for non-blocking operations
        {
            return Ok( await memberRepository.GetMembersAsync());
            
            
        }        

        [HttpGet("{id}")] //localhost:5000/api/members/bob-id
        public  async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);

           if(member == null) 
            return NotFound();
           return member;
        }
        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhoto(string id)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(id));
        }

    }
}
