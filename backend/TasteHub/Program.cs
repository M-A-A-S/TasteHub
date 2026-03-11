using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using TasteHub.Business;
using TasteHub.DataAccess;
using TasteHub.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.Configure<ImageSettings>(builder.Configuration.GetSection("ImageSettings"));
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
//builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));

builder.Services.AddApplicationServices();
builder.Services.AddApplicationRepositories();

builder.Services.AddLogging();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JwtOptions>();

builder.Services.AddSingleton(jwtOptions);



builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.UseSecurityTokenValidators = true;

        var jwtSection = builder.Configuration.GetSection("Jwt");

        options.Events = new JwtBearerEvents
        {
            //OnMessageReceived = context =>
            //{
            //    var authHeader = context.Request.Headers["Authorization"].ToString();

            //    if (!string.IsNullOrEmpty(authHeader) &&
            //        authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            //    {
            //        context.Token = authHeader.Substring("Bearer ".Length).Trim();
            //    }

            //    return Task.CompletedTask;
            //},

            //OnMessageReceived = context =>
            //{
            //    // Get the header
            //    var authHeader = context.Request.Headers["Authorization"].ToString();

            //    Console.WriteLine($"Incoming Header: '{authHeader}'");
            //    Console.WriteLine(jwtOptions);

            //    if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            //    {
            //        // Manually extract and TRIM the token to remove hidden spaces/newlines
            //        context.Token = authHeader.Substring("Bearer ".Length).Trim();
            //    }
            //    return Task.CompletedTask;
            //},

            OnAuthenticationFailed = context =>
            {
                //var authHeader = context.Request.Headers["Authorization"].ToString();
                //Console.WriteLine($"Incoming Header Length: {authHeader.Length}");
                //Console.WriteLine($"Incoming Header Raw: [{authHeader}]");

                var authHeader = context.Request.Headers["Authorization"].ToString();
                Console.WriteLine($"Incoming Header: '{authHeader}'");
                Console.WriteLine(jwtOptions);
                // This will print the real reason to your Debug/Output window
                Console.WriteLine("Auth Failed: " + context.Exception.Message);
                Console.WriteLine(context.Exception.StackTrace);
                return Task.CompletedTask;
            },

        };

        options.Events.OnTokenValidated = (context) =>
        {
            // Replace your cast to JwtSecurityToken.
            //JsonWebToken token = context.SecurityToken as JsonWebToken;
            // Do something ...

            var jwtToken = context.SecurityToken as JsonWebToken;
            Console.WriteLine("Token validated: " + jwtToken?.EncodedPayload);
            return Task.CompletedTask;
        };
        //var jwtOptions = builder.Configuration
        //.GetSection("Jwt")
        //.Get<JwtOptions>();

        //var jwtSection = builder.Configuration.GetSection("Jwt");

        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtOptions.SigningKey)),

            ClockSkew = TimeSpan.Zero

            //ValidateLifetime = true,

            //ClockSkew = TimeSpan.Zero,

            //RoleClaimType = ClaimTypes.Role,
            //NameClaimType = ClaimTypes.Email


        };
    });

builder.Services.AddAuthorization();

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCors", policy =>
    {
        policy.WithOrigins(allowedOrigins!)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


var app = builder.Build();



var appSettings = app.Services
    .GetRequiredService<IOptions<AppSettings>>()
    .Value;

ImageUrlHelper.Configure(appSettings.BaseUrl);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowCors");

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.Run();
