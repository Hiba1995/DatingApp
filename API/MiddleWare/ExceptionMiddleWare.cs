using System;
using System.Net;
using System.Text.Json;
using API.Errors;
using SQLitePCL;

namespace API.MiddleWare;

public class ExceptionMiddleWare(RequestDelegate next, ILogger<ExceptionMiddleWare> logger,
 IHostEnvironment env)
{

public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context );
        }
        catch (Exception ex) // any error unhandled it will be caughted here 
        {
            logger.LogError(ex, "{message}", ex.Message); // log the error in the console , logfile 
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // wo this it will retuen an html error 

            var response = env.IsDevelopment()
            ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new ApiException(context.Response.StatusCode, ex.Message, "Internal Server Error"); // it will return real error message 

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json); // send the json error to the frontend 
        }
        
    }
}


// this is an exception class for error handling to get a proper json response, errors are logged m production is secured 

// i should insert this class in program.cs

// centralized error handling insted of writing try catch in each controller 