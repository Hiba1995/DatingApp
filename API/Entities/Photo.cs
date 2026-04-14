using System;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }

    //Navigation property because we will have a relation between memeber and photo
    [JsonIgnore]
    public Member Member { get; set; } = null!;

    public string MemberId { get; set; } = null!;

}
