'use client';

import ProtectedLayout from '../components/ProtectedLayout';

export default function Home() {
	return (
		<ProtectedLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{/* Card placeholders for future analytics */}
					{[
						{ title: 'Total Users', value: '1,234', change: '+12%' },
						{ title: 'Active Ads', value: '45', change: '+5%' },
						{ title: 'Pending Events', value: '8', change: 'Action Required', highlight: true },
						{ title: 'Total Places', value: '156', change: '+2' },
					].map((stat) => (
						<div key={stat.title} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
							<h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
							<div className="flex items-end justify-between mt-2">
								<span className="text-2xl font-bold text-white">{stat.value}</span>
								<span className={stat.highlight ? 'text-orange-400 text-sm' : 'text-green-400 text-sm'}>{stat.change}</span>
							</div>
						</div>
					))}
				</div>

				<div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
					<h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
					<div className="text-gray-400 text-sm text-center py-8">No recent activity to display.</div>
				</div>
			</div>
		</ProtectedLayout>
	);
}
