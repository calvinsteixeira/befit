export function getHomeGreetingKey(hour: number) {
  if (hour < 12) {
    return 'home.greeting.morning'
  }

  if (hour < 18) {
    return 'home.greeting.afternoon'
  }

  return 'home.greeting.evening'
}
