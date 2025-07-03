import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET() {
  try {
    const users = Array.from({ length: 12 }, () => ({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      company: faker.company.name(),
      jobTitle: faker.person.jobTitle(),
      createdAt: faker.date.past(),
      avatar: faker.image.avatar(),
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    }));

    return NextResponse.json({
      status: 200,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    );
  }
}
