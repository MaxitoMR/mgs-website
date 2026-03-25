// Package main — infrastructure health checker.
// Validates connectivity to Postgres, Redis, and Temporal.
// Exits 0 if all healthy, 1 otherwise. Used as K8s init/sidecar container.
package main

import (
	"fmt"
	"net"
	"os"
	"time"
)

func checkTCP(name, addr string, timeout time.Duration) error {
	conn, err := net.DialTimeout("tcp", addr, timeout)
	if err != nil {
		return fmt.Errorf("%s at %s: %w", name, addr, err)
	}
	conn.Close()
	return nil
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func main() {
	checks := []struct {
		name string
		addr string
	}{
		{"postgres", env("POSTGRES_HOST", "postgres") + ":" + env("POSTGRES_PORT", "5432")},
		{"pgbouncer", env("PGBOUNCER_HOST", "pgbouncer") + ":6432"},
		{"redis", env("REDIS_HOST", "redis") + ":6379"},
		{"temporal", env("TEMPORAL_HOST", "temporal") + ":7233"},
	}

	timeout := 5 * time.Second
	failed := false

	for _, c := range checks {
		if err := checkTCP(c.name, c.addr, timeout); err != nil {
			fmt.Fprintf(os.Stderr, "FAIL: %v\n", err)
			failed = true
		} else {
			fmt.Printf("OK: %s (%s)\n", c.name, c.addr)
		}
	}

	if failed {
		os.Exit(1)
	}
	fmt.Println("All checks passed")
}
