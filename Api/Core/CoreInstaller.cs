using Core.Entities;
using Infrastructure.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public static class CoreInstaller
    {
		public static IServiceCollection AddCore(this IServiceCollection services)
		{
			var sp = services.BuildServiceProvider();
			Configs configs = sp.GetService<IOptions<Configs>>().Value;
			services.AddDbContext<BIContext>((Action<DbContextOptionsBuilder>)(options =>
			{
				options.UseSqlServer((string)configs.DBConnection);
			}));

			return services;
		}
	}
}
