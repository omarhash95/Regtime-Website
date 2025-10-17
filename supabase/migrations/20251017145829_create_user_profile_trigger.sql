/*
  # Create User Profile Trigger

  ## Overview
  This migration creates a database trigger that automatically creates a user profile
  in the `users` table when a new user signs up via Supabase Auth.

  ## Changes
  1. Creates a trigger function `handle_new_user()`
  2. Creates a trigger that fires after INSERT on `auth.users`
  3. Automatically populates the `users` table with basic info

  ## Benefits
  - Eliminates race conditions during signup
  - Ensures every auth user has a corresponding profile
  - Simplifies client-side signup code
*/

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();